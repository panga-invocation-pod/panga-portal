class WorkshopSession < ApplicationRecord
  belongs_to :workshop
  has_many :attendances, class_name: 'WorkshopAttendance', dependent: :destroy

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

  def to_s
    "#{workshop&.name} #{start_at.to_s}"
  end
end
