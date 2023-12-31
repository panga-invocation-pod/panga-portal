module Messaging
  module Conditions
    class ContextCondition
      def self.from_data(data)
        new(data['condition'])
      end

      def initialize(condition)
        @condition = condition.to_sym
      end

      def valid?(context: nil, input: nil)
        raise ArgumentError unless context
        !!context.send(condition)
      end

      private

      attr_reader :condition
    end
  end
end
