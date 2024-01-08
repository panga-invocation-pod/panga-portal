class Admin::WorkshopSessionsController < AdminController
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
    fields.permit(:workshop_id, :start_at, :duration_minutes)
  end
end