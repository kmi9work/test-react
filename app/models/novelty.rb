class Novelty < ApplicationRecord
	belongs_to :category
	belongs_to :author
	belongs_to :age, optional: true

  def as_json(options = {})
    super.merge(published_at: published_at.try(:strftime,'%d.%m %H:%M'))
  end
end
