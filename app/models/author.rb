class Author < ApplicationRecord
  has_secure_password

  validates_presence_of :email
  validates_uniqueness_of :email

  has_many :novelties
end
