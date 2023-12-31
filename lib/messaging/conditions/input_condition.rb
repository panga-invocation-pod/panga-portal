module Messaging
  module Conditions
    class InputCondition
      ALLOWED_CONDITIONS = [:submit, :cancel]

      def self.from_data(data)
        new(data['condition'])
      end

      def initialize(condition)
        @condition = condition.to_sym
        raise ArgumentError, "invalid input condition #{@condition.inspect}" unless ALLOWED_CONDITIONS.include?(@condition)
      end

      def valid?(context: nil, input: nil)
        raise ArgumentError unless input

        case condition
          when :submit
            return valid_submit?(input)
          when :cancel
            return valid_cancel?(input)
          else
            return false
          end
      end

      private

      attr_reader :condition

      def valid_submit?(input)
        input['submit'] == true
      end

      def valid_cancel?(input)
        input['submit'] == false
      end
    end
  end
end
