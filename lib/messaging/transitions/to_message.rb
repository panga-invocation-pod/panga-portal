require_relative 'base_transition'

module Messaging
  module Transitions
    class ToMessage < BaseTransition
      def initialize(to, overrides: {}, if_condition: nil)
        @to = to
        @overrides = overrides
        super if_condition: if_condition
      end

      def inspect
        "<SimpleTransition: #{@to.inspect}>"
      end

      def apply_overrides(message)
        message.apply_overrides overrides if overrides
      end

      def get_message(script:, context: nil, command_result: nil)
        script.find_message to
      end

      attr_reader :to, :overrides
    end
  end
end
