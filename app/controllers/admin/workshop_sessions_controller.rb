class Admin::WorkshopSessionsController < AdminController
  include Crud

  private

  def permit_record_fields(fields)
    fields.permit(:workshop_id, :start_at, :end_at)
  end
end