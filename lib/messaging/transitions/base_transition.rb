module Messaging
  module Transitions
    class BaseTransition
      def initialize(if_condition: nil)
        @if_condition = if_condition
      end

      def valid?(context:)
        if_condition.nil? || if_condition.valid?(context: context)
      end

      private

      attr_reader :if_condition
    end
  end
end
