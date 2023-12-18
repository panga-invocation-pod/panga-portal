require 'messaging/validation_failure'

module Commands
  class LogInInvitee
    include ActiveModel::Validations
    # include Users::Passwords

    # attr_accessor :email, :password

    # validates :email, presence: true, email_format: true
    # validates :password, presence: true

    def call(input, context)
      invitation = context.invitation

      return Messaging::ValidationFailure.new if invitation.nil?

      raise "not implemented"
      # self.email = input['email']
      # self.password = input['password']

      # Messaging::ValidationFailure.new(errors) unless valid?

      # user = User.find_by_email(email)
      # if user && is_password?(user.encrypted_password, password)
      #   execute(context, user)
      # else
      #   Messaging::ValidationFailure.new
      # end
    end

    # private

    # def execute(context, user)
    #   context.user_uuid = user.uuid
    #   context.user_name = user.name
    #   nil
    # end
  end
end
