class WorkshopSession < ApplicationRecord
  belongs_to :workshop
  validates :start_at, presence: true

  def duration
    duration_minutes&.minutes
  end
end
