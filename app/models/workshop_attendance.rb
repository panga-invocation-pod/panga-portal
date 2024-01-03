class WorkshopAttendance < ApplicationRecord
  include AASM

  belongs_to :person
  belongs_to :workshop_session

  aasm do
    state :available, initial: true
    state :invited
  end
end
