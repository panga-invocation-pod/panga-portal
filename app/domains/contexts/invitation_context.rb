module Contexts
  class InvitationContext < Messaging::BaseContext
    include Devise::Controllers::SignInOut

    def initialize(invitation, current_user, controller: nil)
      @invitation = invitation
      @current_user = current_user
      @controller = controller
    end

    attr_reader :invitation, :current_user

    delegate :considering_availability?, to: :invitation, prefix: true

    def current_person
      current_user&.person
    end

    def inviter_thumbnail
      invitation.inviter.avatar.variant(:thumb).url if invitation.inviter.avatar.attached?
    end

    def logged_in_but_not_invitee?
      current_user && current_user.person != invitation.invitee
    end

    def logged_in_as_invitee?
      current_user && current_user.person == invitation.invitee
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
