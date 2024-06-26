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
      :collecting_contact_details?, :awaiting_workshop_invitation?,
      :invited_to_workshop?, :waiting_for_workshop?,
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

    def custom_prompt(name)
      case name
      when 'event_session_details'
        CustomPrompts::EventSessionDetails.new(attendance: invitation.workshop_invitation)
      else
        raise "unknown custom prompt #{name}"
      end
    end

    def workshop
      @workshop ||= Event.find_by_name("Panga Context Setting")
    end

    def invitation_has_email?
      invitation.invitee_email.present?
    end

    def upcoming_workshop_options?
      workshop.sessions.future.any?
    end

    def facilitator_names
      workshop_session.facilitators.map(&:short_name).to_sentence
    end

    def facilitator_names_reference
      names = workshop_session.facilitators.map(&:short_name)
      return "the facilitators" if names.empty?
      return "the facilitator (#{names.first})" if names.one?
      "the facilitators (#{names.to_sentence})"
    end

    private

    def workshop_session
      current_attendance.event_session
    end

    def current_attendance
      invitation.workshop_invitation
    end

    attr_reader :controller
  end
end
