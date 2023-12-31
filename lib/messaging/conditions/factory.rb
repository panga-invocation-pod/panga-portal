require_relative 'context_condition'
require_relative 'input_condition'
require_relative 'and_condition'

module Messaging
  module Conditions
    class Factory
      def self.from_data(data)
        return nil unless data

        type_name = data['type']
        condition_class = Messaging::Conditions.const_get(type_name.camelcase + "Condition")

        condition_class.from_data(data)
      end
    end
  end
end
