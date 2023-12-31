module Messaging
  module Conditions
    class AndCondition
      def self.from_data(data)
        conditions_data = data['conditions']
        conditions = conditions_data.map do |condition_data|
          Factory.from_data(condition_data)
        end

        new(conditions)
      end

      def initialize(conditions)
        raise ArgumentError unless conditions && !conditions.empty?
        @conditions = conditions
      end

      def valid?(context: nil, input: nil)
        raise ArgumentError unless context

        conditions.all? do |condition|
          condition.valid?(context: context)
        end
      end

      private

      attr_reader :conditions
    end
  end
end
