class Event < ApplicationRecord
  has_many :sessions, dependent: :destroy, class_name: 'WorkshopSession'
end
