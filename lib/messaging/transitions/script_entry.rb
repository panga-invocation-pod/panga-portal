require_relative 'to_message'
require_relative "../conditions/factory"

module Messaging
  module Transitions
    class ScriptEntry < ToMessage
      attr_reader :target_message_id

      def self.from_data(data)
        data = { "target" => data } if data.is_a? String

        new data["target"], if_condition: Conditions::Factory.from_data(data["if"])
      end

      def initialize(target_message_id, if_condition: nil)
        @target_message_id = target_message_id
        super
      end

      def apply_overrides(message)
        message
      end

      def get_message(script)
        script.find_message target_message_id
      end
    end
  end
end
