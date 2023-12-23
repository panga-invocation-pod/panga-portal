class InvitationsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:chat]

  def show
    @invitation = Invitation.find_by!(token: params[:token])
    @workshop_sessions = @invitation.applicable_workshop_sessions(limit: 6)
  end

  def chat
    @invitation = Invitation.find_by!(token: params[:token])

    script = Messaging::Script.from_file script_path(:workshop_invitation)
    # context = Context.new(encoded_token: bearer_token)
    context = Contexts::InvitationContext.new(@invitation, current_user, controller: self)
    command_processor = Messaging::CommandProcessor.new('Commands')

    exchange = Messaging::Exchange.new script: script, context: context, command_processor: command_processor
    exchange.user_input to: reply[:to], input: reply[:input] if reply
    exchange.process_response_commands
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