class Admin::UsersController < AdminController
  include Crud

  private

  def permit_record_fields(fields)
    fields.permit(:email, :person_id)
  end
end
