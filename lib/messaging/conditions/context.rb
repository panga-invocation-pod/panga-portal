module Messaging
  module Conditions
    class Context
      def self.from_data(data)
        new(data['condition'])
      end

      def initialize(condition)
        @condition = condition.to_sym
      end

      def valid?(context: nil)
        raise ArgumentError unless context
        !!context.send(condition)
      end

      private

      attr_reader :condition
    end
  end
end
