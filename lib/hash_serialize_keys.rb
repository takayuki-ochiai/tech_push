module HashSerializeKeys
  refine Hash do
    unless method_defined?(:underscore_keys)
      def underscore_keys
        deep_transform_keys do |key|
          if key.is_a?(::String)
            key = key.underscore
          end

          if key.is_a?(::Symbol)
            key = key.to_s.underscore.to_sym
          end
          key
        end
      end
    end

    unless method_defined?(:underscore_keys!)
      def underscore_keys!
        deep_transform_keys! do |key|
          if key.is_a?(::String)
            key = key.underscore
          end

          if key.is_a?(::Symbol)
            key = key.to_s.underscore.to_sym
          end
          key
        end
      end
    end


    unless method_defined?(:camelize_keys)
      def camelize_keys(first_letter = :lower)
        deep_transform_keys do |key|
          if key.is_a?(::String)
            key = key.camelize(first_letter)
          end

          if key.is_a?(::Symbol)
            key = key.to_s.camelize(first_letter).to_sym
          end
          key
        end
      end
    end

    unless method_defined?(:camelize_keys!)
      def camelize_keys!(first_letter = :lower)
        deep_transform_keys! do |key|
          if key.is_a?(::String)
            key = key.camelize(first_letter)
          end

          if key.is_a?(::Symbol)
            key = key.to_s.camelize(first_letter).to_sym
          end
          key
        end
      end
    end
  end
end
