class EventSession < ApplicationRecord
  belongs_to :event
  belongs_to :location, optional: true
  has_many :attendances, class_name: 'Attendance', dependent: :destroy
  has_many :facilitator_attendances, -> { where(attendances: { aasm_state: 'facilitator'}) }, class_name: 'Attendance'
  has_many :facilitators, through: :facilitator_attendances, source: :person

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
    "#{event&.name} #{start_at.to_s}"
  end
end
