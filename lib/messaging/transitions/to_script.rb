require_relative 'to_message'

module Messaging
  module Transitions
    class ToScript < ToMessage
      def initialize(to, overrides: {}, if_condition: nil)
        raise ArgumentError unless to == "entry"
        super
      end

      def inspect
        "<ToScript (entry)>"
      end

      def get_message(script:, context: nil, command_result: nil)
        entry_transition = script.transition_for(context: context, input: nil, command_result: command_result, previous: nil)
        raise "Could not find script entry point" unless entry_transition
        entry_transition.get_message script: script, context: context, command_result: command_result
      end
    end
  end
end
