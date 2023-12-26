require_relative 'base_transition'

module Messaging
  module Transitions
    class ToMessage < BaseTransition
      def initialize(target_message_id, overrides: {}, if_condition: nil)
        @target_message_id = target_message_id
        @overrides = overrides
        super if_condition: if_condition
      end

      def inspect
        "<SimpleTransition: #{@target_message_id.inspect}>"
      end

      def apply_overrides(message)
        message.apply_overrides overrides if overrides
      end

      def get_message(script)
        script.find_message target_message_id
      end

      attr_reader :target_message_id, :overrides
    end
  end
end
