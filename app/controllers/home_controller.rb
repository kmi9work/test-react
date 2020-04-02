class Controller < ApplicationController
  skip_before_action :authenticate_author!, :only => [:index]
  def index
    @novelties = Novelty.all.order(:published_at)    
  end
end
