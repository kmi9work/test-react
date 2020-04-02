class SessionsController < ApplicationController
  include CurrentAuthorConcern

  def create
    author = Author
                .find_by(email: params["author"]["email"])
                .try(:authenticate, params["author"]["password"])
    if author
      session[:author_id] = author.id
      render json: {
        status: :created,
        logged_in: true,
        author: author
      }
    else
      render json: { status: 401 }
    end
  end

  def logged_in
    if @current_author
      render json: {
        logged_in: true,
        author: @current_author
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    reset_session
    render json: {status: 200, logged_out: true}
  end
end