require_relative 'to_message'
require_relative "../conditions/factory"

module Messaging
  module Transitions
    class ScriptEntry < ToMessage
      def self.from_data(data)
        data = { "target" => data } if data.is_a? String

        new data["target"], if_condition: Conditions::Factory.from_data(data["if"])
      end

      def initialize(target_message_id, if_condition: nil)
        super
      end
    end
  end
end
