class InvitationsController < ApplicationController
  def show
    @invitation = Invitation.find_by!(token: params[:token])
    @workshop_sessions = @invitation.applicable_workshop_sessions(limit: 6)
  end
end