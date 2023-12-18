module Contexts
  class InvitationContext < Messaging::BaseContext
    include Devise::Controllers::SignInOut

    def initialize(invitation, current_user, controller: nil)
      @invitation = invitation
      @current_user = current_user
      @controller = controller
    end

    attr_reader :invitation, :current_user

    def current_person
      current_user&.person
    end

    def logged_in_but_not_invitee?
      current_user && current_user.person != invitation.invitee
    end

    def sign_in(user)
      raise RuntimeError, "controller must be supplied to sign in a user" unless controller
      controller.sign_in user
    end

    def as_json
      {}
    end

    private

    attr_reader :controller
  end
end
