class Admin::InvitationsController < Admin::AdminController
  include Crud

  private

  def permit_record_fields(fields)
    fields.permit(:inviter_id, :invitee_id, :token)
  end
end