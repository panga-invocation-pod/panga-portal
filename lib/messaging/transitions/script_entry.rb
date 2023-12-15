require_relative "../conditions/factory"

module Messaging
  module Transitions
    class ScriptEntry
      attr_reader :target_message_id

      def self.from_data(data)
        data = { "target" => data } if data.is_a? String

        new data["target"], Conditions::Factory.from_data(data["if"])
      end

      def initialize(target_message_id, if_condition = nil)
        @target_message_id = target_message_id
        @if_condition = if_condition
      end

      def apply_overrides(message)
        message
      end

      def get_message(script)
        script.find_message target_message_id
      end

      def transition_for(input, command_result = nil)
        self if valid?
      end

      private

      attr_reader :if_condition

      def valid?
        if_condition.nil? || if_condition.valid?
      end
    end
  end
end
