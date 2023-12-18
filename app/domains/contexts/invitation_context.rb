module Contexts
  class InvitationContext < Messaging::BaseContext
    def initialize(invitation, current_user)
      @invitation = invitation
      @current_user = current_user
    end

    attr_reader :invitation, :current_user

    def current_person
      current_user&.person
    end

    def logged_in_but_not_invitee?
      current_user && current_user.person != invitation.invitee
    end
  end
end
