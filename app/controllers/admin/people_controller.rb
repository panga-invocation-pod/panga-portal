class Admin::PeopleController < AdminController
  include Crud

  private

  def permit_record_fields(fields)
    fields.permit(:short_name, :full_name, :avatar)
  end
end