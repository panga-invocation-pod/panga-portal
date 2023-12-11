class WorkshopSession < ApplicationRecord
  belongs_to :workshop
  validates :start_at, presence: true

  scope :future, -> { where('start_at > ?', Time.zone.now) }

  def duration
    duration_minutes&.minutes
  end

  def start_on
    start_at.to_date
  end

  def end_at
    start_at + duration if duration
  end
end
