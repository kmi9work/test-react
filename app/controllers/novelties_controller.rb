class NoveltiesController < ApplicationController
  include CurrentAuthorConcern
  def index
    @novelties = Novelty.all.order(:published_at)
    @categories = Category.all
    @ages = Age.all
  end

  def show
    @novelty = Novelty.find(params[:id])
  end

  def update
    novelty = Novelty.find(params[:id])
    if @current_author and @current_author == novelty.author
      if novelty.update!(novelty_params)
        render json: {
          status: :updated,
          novelty: novelty.to_json(include: [:category, :author, :age])
        }
      else
        render json: {status: 500}
      end
    else
      render json: { status: 403 }
    end
  end

  def create
    if @current_author
      novelty = Novelty.new(novelty_params)
      novelty.author = @current_author
      if novelty.save!
        render json: {
          status: :created,
          novelty: novelty.to_json(include: [:category, :author, :age])
        }
      else
        render json: {status: 500}
      end
    else
      render json: { status: 403 }
    end
  end

  def destroy
    novelty = Novelty.find(params[:id])
    if @current_author and @current_author == novelty.author
      if novelty.destroy!
        render json: {
          status: :destroyed
        }
      else
        render json: {status: 500}
      end
    else
      render json: { status: 403 }
    end
  end  

  private

  def novelty_params
    params.require(:novelty).permit(:title, :text, :source, :source_url, :category_id, :age_id)
  end
end
