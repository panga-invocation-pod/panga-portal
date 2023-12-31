module Messaging
  module Responders
    class Custom
      def self.from_data(data)
        new data['name'], custom_data: data['custom_data']
      end

      def initialize(name, custom_data: nil)
        @name = name
        @custom_data = custom_data || {}
      end

      attr_reader :name, :custom_data

      def as_json(context: nil, interpolator: nil)
        {
          responder_type: 'custom',
          name: name,
          custom_data: custom_data.merge(context.custom_responder(name).as_json)
        }
      end
    end
  end
end