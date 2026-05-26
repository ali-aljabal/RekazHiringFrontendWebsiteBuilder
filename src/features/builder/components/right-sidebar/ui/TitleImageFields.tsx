import { useDebouncedField } from "@/features/builder/hooks/use-debounced-field";
import { InspectorRow } from "./InspectorRow";
import { InspectorSection } from "./InspectorSection";
import { inspectorTextInputClass, inspectorTextInputPlaceholderClass } from "./input-styles";

type TitleImageFieldsProps = {
  title: string;
  image: string;
  onTitleChange: (value: string) => void;
  onImageChange: (value: string) => void;
};

export function TitleImageFields({
  title: titleProp,
  image: imageProp,
  onTitleChange,
  onImageChange,
}: TitleImageFieldsProps) {
  const [title, setTitle, flushTitle] = useDebouncedField(titleProp, onTitleChange);
  const [image, setImage, flushImage] = useDebouncedField(imageProp, onImageChange);

  return (
    <InspectorSection title="Content">
      <InspectorRow label="Title">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={flushTitle}
          className={inspectorTextInputClass}
        />
      </InspectorRow>
      <InspectorRow label="Image URL">
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          onBlur={flushImage}
          placeholder="https://…"
          className={inspectorTextInputPlaceholderClass}
        />
      </InspectorRow>
    </InspectorSection>
  );
}
