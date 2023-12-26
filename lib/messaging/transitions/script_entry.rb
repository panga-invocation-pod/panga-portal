require_relative 'base_transition'
require_relative "../conditions/factory"

module Messaging
  module Transitions
    class ScriptEntry < BaseTransition
      attr_reader :target_message_id

      def self.from_data(data)
        data = { "target" => data } if data.is_a? String

        new data["target"], if_condition: Conditions::Factory.from_data(data["if"])
      end

      def initialize(target_message_id, if_condition: nil)
        @target_message_id = target_message_id
        super if_condition: if_condition
      end

      def apply_overrides(message)
        message
      end

      def get_message(script)
        script.find_message target_message_id
      end

      def transition_for(context:, input:, command_result: nil)
        self if valid?(context: context)
      end
    end
  end
end
