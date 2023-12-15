module Messaging
  module Transitions
    class ScriptEntry
      attr_reader :target_message_id

      def self.from_data(data)
        data = { "target" => data } if data.is_a? String

        new data["target"]
      end

      def initialize(target_message_id)
        @target_message_id = target_message_id
      end

      def apply_overrides(message)
        message
      end

      def get_message(script)
        script.find_message target_message_id
      end

      def transition_for(input, command_result = nil)
        self
      end
    end
  end
end
