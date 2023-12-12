module Messaging
  class BaseContext
    def read_value(key)
      key.split('.').reduce(self) do |subject, key|
        subject.send key
      end
    end
  end
end