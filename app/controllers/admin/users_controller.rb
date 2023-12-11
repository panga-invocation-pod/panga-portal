class Admin::UsersController < Admin::AdminController
  include Crud

  private

  def permit_record_fields(fields)
    fields.permit(:email, :password, :password_confirmation)
  end
end
