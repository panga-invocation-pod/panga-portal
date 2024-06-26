class Admin::EventsController < AdminController
  include Crud

  private

  def permit_record_fields(fields)
    fields.permit(:name)
  end
end