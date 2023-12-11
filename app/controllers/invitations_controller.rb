class InvitationsController < ApplicationController
  def show
    @invitation = Invitation.find_by!(token: params[:token])
  end
end