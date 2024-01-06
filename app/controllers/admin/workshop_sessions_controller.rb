class Admin::WorkshopSessionsController < AdminController
  include Crud

  def show
    record
    @to_invite_count = record.attendances.invite_planned.count
  end

  def invite_all_planned
  end

  private

  def permit_record_fields(fields)
    fields.permit(:workshop_id, :start_at, :duration_minutes)
  end
end