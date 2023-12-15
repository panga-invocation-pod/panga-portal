class InvitationsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:chat]

  def show
    @invitation = Invitation.find_by!(token: params[:token])
    @workshop_sessions = @invitation.applicable_workshop_sessions(limit: 6)
  end

  class InvitationContext < Messaging::BaseContext
    def initialize(invitation, current_user)
      @invitation = invitation
      @current_user = current_user
    end

    attr_reader :invitation

    def current_person
      @current_user&.person
    end
  end

  def chat
    @invitation = Invitation.find_by!(token: params[:token])

    script = Messaging::Script.from_file script_path(:workshop_invitation)
    # context = Context.new(encoded_token: bearer_token)
    context = InvitationContext.new(@invitation, current_user)
    command_processor = Messaging::CommandProcessor.new('Users::Commands')

    exchange = Messaging::Exchange.new script: script, context: context
    exchange.user_input to: reply[:to], input: reply[:input] if reply
    exchange.process_commands command_processor
    exchange.determine_response

    render json: exchange.as_json
  end

  private

  def reply
    params[:reply]
  end

  def script_path(name)
    Rails.root.join('app', 'scripts', "#{name}.json")
  end
end