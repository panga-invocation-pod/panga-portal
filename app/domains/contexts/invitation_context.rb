module Contexts
  class InvitationContext < Messaging::BaseContext
    include Devise::Controllers::SignInOut

    def initialize(invitation, current_user, controller: nil)
      @invitation = invitation
      @current_user = current_user
      @controller = controller
    end

    attr_reader :invitation, :current_user

    delegate :new?, :confirmed_identity?, :considering_accessibility?,
      :considering_availability?, :in_progress?, :opted_out?,
      to: :invitation, prefix: true

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
      #raise "signing in"
      raise RuntimeError, "controller must be supplied to sign in a user" unless controller
      controller.sign_in user
      @current_user = user
    end

    def as_json
      {}
    end

    def custom_responder(name, custom_data: nil)
      case name
      when 'select_session_availability'
        CustomResponders::SelectSessionAvailability.new(workshop: workshop, custom_data: custom_data)
      else
        raise "unknown custom responder #{name}"
      end
    end

    def workshop
      @workshop ||= Workshop.find_by_name("Panga Context Setting")
    end

    private

    attr_reader :controller
  end
end
