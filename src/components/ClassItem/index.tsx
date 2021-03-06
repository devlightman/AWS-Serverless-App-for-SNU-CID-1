import {
  IonGrid,
  IonRow,
  IonSkeletonText,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonIcon,
  IonText
} from '@ionic/react';
import { bookmark } from 'ionicons/icons';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { Class } from '../../models';
import { useStores } from '../../stores/RootStore';
import ClassDetailsModal from './ClassDetailsModal';

export interface IClassItemProps {
  classItem: Class;
  description: string;
}

export const ClassItem: React.FC<IClassItemProps> = observer(({ classItem, description }) => {
  const [showClassDetails, setShowClassDetails] = useState(false);
  const { classStore } = useStores();
  return (
    <>
      <ClassDetailsModal
        classItem={classItem}
        showClassDetails={showClassDetails}
        onDidDismiss={() => setShowClassDetails(false)}
      />
      <IonCard onClick={() => setShowClassDetails(true)}>

        <IonCardHeader>
          {/* Show class name and professor name and notif dot */}
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonIcon icon={bookmark} />
              <IonText class="ion-margin-start">
                <h3>{classItem.name}</h3></IonText>
            </IonRow>
            {/* <IonRow><IonText class="ion-margin-start">{teacher.name}</IonText></IonRow> */}
          </IonGrid>
        </IonCardHeader>
        <IonCardContent>
          {
            (classStore.isLoading) ?
              <IonSkeletonText animated style={{ width: '100%' }} /> :
              <IonText>{description}</IonText>
          }
        </IonCardContent>
      </IonCard>
    </>
  )
});
