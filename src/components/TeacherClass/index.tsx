import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { observer } from "mobx-react";
import { useState } from "react";
import { useStores } from "../../stores/RootStore";
import { UserDataType } from "../../stores/UserStore";
import { ClassItem, IClassItemProps } from "../ClassItem";
import AddClassModal from "./AddClassModal";

interface ITeacherClassProps {
  userData: UserDataType;
}


export const TeacherClass: React.FC<ITeacherClassProps> = observer(({ userData }) => {
  const [isFabOpen, setIsFabOpen] = useState(false);

  const { classStore } = useStores();

  return (
    <>
      {/* Implement add class component */}
      <AddClassModal
        showModal={isFabOpen}
        onDidDismiss={() => setIsFabOpen(false)}
      />
      <div className="ion-padding-start ion-padding-end ion-padding-bottom ion-margin-bottom">
        {
          (classStore.isLoading) ?
            <div>Loading</div> :
            classStore.classes.map((classData) => {
              if (classData !== null) {
                const classItemProps: IClassItemProps = {
                  classItem: classData,
                  description: classData.description,
                }
                return (
                  <ClassItem {...classItemProps} />
                );
              } else {
                return <></>;
              }
            })
        }
      </div>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton color="primary">
          <IonIcon
            icon={add}
            onClick={() => {
              setIsFabOpen(true);
            }} />
        </IonFabButton>
      </IonFab>
    </>
  );
});
