class RegistrationsController < ApplicationController
  def create
    author = Author.create!(
      name: params["author"]["name"],
      email: params["author"]["email"],
      password: params["author"]["password"],
      password_confirmation: params["author"]["password"]
    )
    if author
      session[:author_id] = author.id
      render json: {
        status: :created,
        author: author
      }
    else
      render json: { status: 500 }
    end
  end
end