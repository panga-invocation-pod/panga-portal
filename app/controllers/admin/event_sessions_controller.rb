class Admin::EventSessionsController < AdminController
  include Crud

  def show
    record
    @to_invite_count = planned_attendences.count
  end

  def invite_all_planned
    planned_attendences.each do |attendance|
      attendance.invite!
    end
  end

  private

  def planned_attendences
    record.attendances.invite_planned
  end

  def permit_record_fields(fields)
    fields.permit(:event_id, :start_at, :duration_minutes, :workshop_location_id, :facilitator_ids => [])
  end
end