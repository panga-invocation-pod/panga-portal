class Admin::InvitationsController < AdminController
  include Crud

  def reset
    record.reset!
    redirect_to action: :index
  end

  private

  def permit_record_fields(fields)
    fields.permit(:inviter_id, :invitee_id, :token, :message)
  end
end