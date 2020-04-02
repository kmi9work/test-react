module CurrentAuthorConcern 
  extend ActiveSupport::Concern

  included do
    before_action :set_current_author
  end

  def set_current_author
    if session[:author_id]
      @current_author = Author.find(session[:author_id])
    end
  end
end