class Admin::InvitationsController < Admin::AdminController
  def index
    @invitations = Invitation.all
  end

  def new
    @invitation = Invitation.new
  end

  def create
    @invitation = Invitation.new(invitations_params)

    respond_to do |format|
      if @invitation.save
        format.html { redirect_to admin_invitations_url, notice: "Invitation was successfully created." }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_invitation
    @invitation = Invitation.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def invitation_params
    params.fetch(:invitation, {}).permit(:inviter, :invitee, :token)
  end
end